import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsCollection = collection(db, 'reports');
      const reportsSnapshot = await getDocs(reportsCollection);
      const reportsList = reportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(reportsList);
    };

    fetchReports();
  }, []);

  const handleResolveReport = async (reportId) => {
    await updateDoc(doc(db, 'reports', reportId), {
      resolved: true,
    });
    setReports(reports.filter(report => report.id !== reportId));
  };

  return (
    <div>
      <h2>User Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            {report.text}
            <button onClick={() => handleResolveReport(report.id)}>Resolve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReports;
