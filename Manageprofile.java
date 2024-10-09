package Pack1;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.time.Duration;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import graphql.Assert;

class Manageprofile {

	 WebDriver driver;

	    @BeforeEach
	    public void setUp() {
	        driver = new ChromeDriver();
	        driver.get("http://localhost:3000/Manageprofile"); 
	    }

	    @AfterEach
	    public void tearDown() {
	        if (driver != null) {
	            driver.quit();
	        }
	    }
	    
	    private void loadHomePage() {
	    	driver.get("http://localhost:3000"); 
	        driver.findElement(By.xpath("//input[@type='email']")).sendKeys("neet@gmail.com"); 
	        driver.findElement(By.xpath("//input[@type='password']")).sendKeys("123456"); 
	        driver.findElement(By.xpath("//button[contains(text(),'Sign In')]")).click(); 

	        try {
	            Thread.sleep(3000); 
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }

	       driver.get("http://localhost:3000/Manageprofile");

	       try {
	            Thread.sleep(3000); 
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }


	        }
	    
	    
	    @Test
	    public void TestTittle() {
	    	loadHomePage();
	    	WebElement Titile = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/h2"));
	    	String expectedName = "Manage Profile";
	    	String actualName = Titile.getText();
	    	assertEquals(expectedName, actualName);
	    }
	    
	    @Test
	    public void CheckGiven_name() {
	    	loadHomePage();
	    	WebElement emailField = driver.findElement(By.cssSelector("#root > div > div > div.manage-profile-container > div:nth-child(2) > input[type=text]"));
	    	String expectedName = "Navneet";
	    	String actualName = emailField.getAttribute("value");
	    	assertEquals(expectedName, actualName);
	    }

	    
	    
	    
	    @Test
	    public void NameFeild_Sendkey() {
	    	loadHomePage();
	        WebElement nameField = driver.findElement(By.cssSelector("#root > div > div > div.manage-profile-container > div:nth-child(2) > input[type=text]"));
	        nameField.clear();
	        nameField.sendKeys("Navneet");
	        assertNotNull(nameField);
	    }
	    
	    @Test
	    public void CheckGiven_Email() {
	    	loadHomePage();
	    	WebElement emailField = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/input"));
	    	String expectedEmail = "neet@gmail.com";
	    	String actualEmail = emailField.getAttribute("value");
	    	assertEquals(expectedEmail, actualEmail);
	    }
	    @Test
	    public void EmailFeild_Sendkey() {
	    	loadHomePage();
	    	WebElement emailField = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]/input"));
	    	emailField.clear();
	        emailField.sendKeys("Navneet@gmail.com");
	        assertNotNull(emailField);
	    }

	    @Test
	    public void BioNotNull() {
	    	loadHomePage();
	    	WebElement BioTextField = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[3]/textarea"));
	        String bioText = BioTextField.getText();
	        assertFalse( bioText.isEmpty());
	
	    }

	    @Test
	    public void testProfilePhotoButton() {	    	
	        loadHomePage();	        
	        WebElement profilePhoto = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[4]/input"));
	        assertFalse( profilePhoto.isDisplayed());
	        assertEquals(0, driver.findElements(By.xpath("/html/body/div/div/div/div[2]/div[4]/button")).size());

	    }
	    
	    @Test
	    public void testDeleteButtonIsDisplayed() {
	    	loadHomePage();	
	        WebElement deleteButton = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[4]/button"));
	        deleteButton.click();
	        assertNotNull(deleteButton);
	    }
	    
	    @Test
	    public void testUpdateButton_Alert() {
	        loadHomePage();
	        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[5]/button[1]")).click();
	        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
	        Alert simpleAlert = wait.until(ExpectedConditions.alertIsPresent());
	        String txtSimpleAlert = simpleAlert.getText();
	        assertEquals("Profile updated successfully!", txtSimpleAlert);
	        simpleAlert.accept();
	    }

	    
	    @Test
	    public void testDeletePhoto_ConfirmAlert() {
	        loadHomePage();
	        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[4]/button")).click();
	        Alert confirmAlert = driver.switchTo().alert();
	        String txtConfirmAlert = confirmAlert.getText();
	        assertEquals("Are you sure you want to delete your profile photo?", txtConfirmAlert);
	        confirmAlert.dismiss();
	    }
	    
	    
	    
	    
	    @Test
	    public void testBUTTON_DeletePhotoNotDisplay() {
	        loadHomePage();
	        WebElement deleteButton = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[4]/button"));
	        assertFalse(deleteButton.isDisplayed());
	    }
	    


	    @Test
	    public void testDeleteButton_Alert() {
	    	loadHomePage();
		        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[5]/button[2]")).click();
		        Alert simpleAlert = driver.switchTo().alert();
		        String txtSimpleAlert = simpleAlert.getText();
		        assertEquals("Are you sure you want to delete your account? This action cannot be undone.", txtSimpleAlert); 
		        simpleAlert.dismiss();
		    }
	    
	    
	    @Test
	    public void testDeleteButton_NotNull() {
	    	loadHomePage();
		        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[5]/button[2]")).click();
		        Alert simpleAlert = driver.switchTo().alert();
		        String txtSimpleAlert = simpleAlert.getText();
		        assertEquals("Are you sure you want to delete your account? This action cannot be undone.", txtSimpleAlert); 
		        simpleAlert.dismiss();
		        
		        String groupChatUrl = driver.getCurrentUrl();
		        assertNotNull(groupChatUrl);
		    }

	   


	    
	    private String extractHashLink(String href) {
	        return href.contains("#") ? href.substring(href.lastIndexOf("#")) : href;

	    }
}
