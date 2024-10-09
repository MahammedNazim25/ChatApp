package Mywebsite;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
class WebTest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
    }

    @AfterEach
    void tearDown() {
       
        if (driver != null) {
            driver.quit();
        }
    }

    private void loadHomePage() {
        driver.get("http://localhost:3000/"); 
       
    }
    private void loadHome() {
    	 driver.get("http://localhost:3000/ContactUs");
    }
    private void loadadd() {
    	driver.get("http://localhost:3000/Admin");
    }
    private void loadhelp() {
    	driver.get("http://localhost:3000/Help");
    }
    private void loadpolicy() {
    	driver.get("http://localhost:3000/Policy");
    }
    private void loadAbout() {
    	driver.get("http://localhost:3000/About");
    }
    private void loadWelcome() {
    	driver.get("http://localhost:3000/Welcome");
    }
    
   
    @Test
       void testSigninLink() {
        loadHomePage();
        WebElement signinLink = driver.findElement(By.xpath("/html/body/div/div/div/div/div"));
        assertEquals("La Connecxion", signinLink.getAttribute("La Connecxion"), "Signin link href should be 'La Connecxion'");
    }
    @Test
    void testSigninmail() {
    	loadHomePage();
    	WebElement signinmail = driver.findElement(By.xpath("/html/body/div/div/div/div/form/input[1]"));
    	 boolean checking = signinmail.isSelected();
       	 Assert.assertFalse(checking);
    }
    @Test
    void testSigninpassword(){
    	loadHomePage();
    	WebElement signinpassword = driver.findElement(By.xpath("/html/body/div/div/div/div/form/input[2]"));
    	 boolean checking = signinpassword.isSelected();
       	 Assert.assertFalse(checking);
    }
    @Test
    void testsigninbutton() {
		 loadHomePage();
	        WebElement signinButton = driver.findElement(By.xpath("/html/body/div/div/div/div/form/button[1]"));
	        signinButton.click();
	        Assert.assertTrue(signinButton.isSelected());
    
    }
    @Test
    void testSignupLink() {
        loadHomePage();
        WebElement SignupLink = driver.findElement(By.xpath("/html/body/div/div/div/div/form/button[2]"));
        assertNull(SignupLink.getAttribute("href"), "Services link should not have an href attribute");
    }
    @Test
    void testFooter() {
        loadHomePage();
        WebElement footer = driver.findElement(By.xpath("/html/body/div/div/div/footer"));
        	 Assert.assertTrue("Footer is not displayed", footer.isDisplayed());
             String expectedFooterText = "www.La Connecxioncallchat.com";
             String actualFooterText = footer.getText();
             Assert.assertEquals("Footer text does not match", expectedFooterText, actualFooterText);
    }
    @Test
    void testFooterlink() {
        loadHomePage();
        WebElement footerlink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]/p"));
        Assert.assertTrue("Terms link is not displayed", footerlink.isDisplayed());
    }
    @Test
    void testFootersociallink() {
        loadHomePage();
        WebElement footersociallink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]/p"));
        Assert.assertFalse("Terms link is not displayed", footersociallink.isDisplayed());
    }
    
    @Test
    void testSignupmail() {
    	loadHomePage();
    	WebElement signupmail = driver.findElement(By.xpath("/html/body/div/div/div/div/form/input[1]"));
    	 boolean checking = signupmail.isSelected();
       	 Assert.assertTrue(checking);
    }
    @Test
    void testSignuppassword(){
    	loadHomePage();
    	WebElement signuppassword = driver.findElement(By.xpath("/html/body/div/div/div/div/form/input[2]"));
    	 boolean checking = signuppassword.isSelected();
       	 Assert.assertFalse(checking);
    }
    @Test
    void testsignupbutton() {
		 loadHomePage();
	        WebElement signupButton = driver.findElement(By.xpath("/html/body/div/div/div/div/form/button[1]"));
	        signupButton.click();
            Assert.assertTrue(signupButton.isSelected());
    
    }
    @Test
    void testLoginLink() {
        loadHomePage();
        WebElement LoginLink = driver.findElement(By.xpath("/html/body/div/div/div/div/form/button[2]"));
        assertNull(LoginLink.getAttribute("href"), "Services link should not have an href attribute");
    }
    @Test
    void testsignupFooter() {
        loadHomePage();
        WebElement footersignup = driver.findElement(By.xpath("/html/body/div/div/div/footer/div"));
        	 Assert.assertTrue("Footer is not displayed", footersignup.isDisplayed());
             String expectedFooterText = "www.La Connecxioncallchat.com";
             String actualFooterText = footersignup.getText();
             Assert.assertEquals("Footer text does not match", expectedFooterText, actualFooterText);
    }
    @Test
    void testsignupFooterpolicylink() {
        loadHomePage();
        WebElement signupfooterlink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]/p"));
        Assert.assertTrue("Terms link is not displayed", signupfooterlink.isDisplayed());
    }
    @Test
    void testsignupFootersociallink() {
        loadHomePage();
        WebElement signupfootersociallink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]/p"));
        Assert.assertFalse("Terms link is not displayed", signupfootersociallink.isDisplayed());
    }
    
    @Test
    void testContactmail() {
    	loadHome();
        WebElement contactmail = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/form/div[1]/input"));
        boolean checking = contactmail.isDisplayed();  
        Assert.assertTrue(checking);
    }
    @Test
    void testContactquery() {
    	loadHome();
        WebElement contactquery = driver.findElement(By.id("query"));
        boolean checking = contactquery.isDisplayed(); 
        Assert.assertTrue(checking);
    }
    @Test
    void testContactmessage() {
    	loadHome();
        WebElement contactmessage = driver.findElement(By.id("message"));
        boolean checking = contactmessage.isDisplayed();
        Assert.assertTrue(checking);
    }
    @Test
    void testContactbutton() {
    	loadHome();
	        WebElement contactButton = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/form/button"));
	        contactButton.click();
            Assert.assertTrue(contactButton.isSelected());
    
    }
    @Test
    void testcontactFooter() {
    	loadHome();
        WebElement footercontact = driver.findElement(By.xpath("/html/body/div/div/div/footer/div"));
        	 Assert.assertTrue("Footer is not displayed", footercontact.isDisplayed());
             String expectedFooterText = "www.La Connecxioncallchat.com";
             String actualFooterText = footercontact.getText();
             Assert.assertEquals("Footer text does not match", expectedFooterText, actualFooterText);
    }
    @Test
    void testcontactFooterpolicylink() {
    	loadHome();
        WebElement contactfooterlink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]"));
        Assert.assertTrue("Terms link is not displayed", contactfooterlink.isDisplayed());
    }
    @Test
    void testcontactFootersociallink() {
    	loadHome();
        WebElement contactfootersociallink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]/p"));
        Assert.assertFalse("Terms link is not displayed", contactfootersociallink.isDisplayed());
    }
    
    @Test
    void testlogoutbutton() {
    	loadWelcome();
	        WebElement logoutButton = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[6]/li/a"));
	        logoutButton.click();
            Assert.assertTrue(logoutButton.isSelected());
    }
	@Test
	void testHeader() {
		 loadadd();
	  
    	 WebElement header = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/h1"));

    	 boolean checking =    header.isSelected();
    	 Assert.assertNotNull(header);
	
	
}
	@Test
    void testAdminname() {
		 loadadd();
		  WebElement Adminname = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/form/input[1]"));
        boolean checking =Adminname.isDisplayed();  // Check if the email field is displayed
        Assert.assertTrue(checking);
    }
	@Test
    void testAdminemail() {
		 loadadd();
		  WebElement Adminemail = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/form/input[2]"));
        boolean checking =Adminemail.isDisplayed();  // Check if the email field is displayed
        Assert.assertTrue(checking);
    }
	
	  @Test
	    void testInvitebutton() {
		  loadadd();
		        WebElement inviteButton = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/form/button"));
		        inviteButton.click();
                Assert.assertTrue(inviteButton.isSelected());
	  }
	  @Test
	  void testmanageuser() {
		  loadadd();
		  WebElement manage = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[2]"));
		  boolean checking = manage.isDisplayed();
		  Assert.assertTrue(checking);
	  }
	  @Test
	    void testAdminFooter() {
		  loadadd();
	        WebElement adminsignup = driver.findElement(By.xpath("/html/body/div/div/div/footer/div"));
	        	 Assert.assertTrue("Footer is not displayed", adminsignup.isDisplayed());
	        	 String expectedFooterText = "www.La Connecxioncallchat.com";
	             String actualFooterText = adminsignup.getText();
	             Assert.assertEquals("Footer text does not match", expectedFooterText, actualFooterText);
	    }
	    @Test
	    void testAdminFooterpolicylink() {
	    	loadadd();
	        WebElement adminfooterlink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]"));
	        Assert.assertTrue("Terms link is not displayed", adminfooterlink.isDisplayed());
	    }
	    @Test
	    void testAdminFootersociallink() {
	    	loadadd();
	        WebElement adminfootersociallink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]"));
	        Assert.assertFalse("Terms link is not displayed", adminfootersociallink.isDisplayed());
	    }
	    
	  
	  @Test
	    void testHelpLink() {
		  loadHomePage();
	        WebElement helpLink = driver.findElement(By.xpath("/html/body/div/div/div/div/ul/li[1]/a"));
	        assertNotNull(helpLink.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testhelpmail() {
		  loadhelp();
	    	WebElement helpmail = driver.findElement(By.xpath("/html/body/div/div/div/main/form/div[1]/input"));
	    	 boolean checking = helpmail.isSelected();
	       	 Assert.assertTrue(checking);
	    }
	  @Test
	    void testhelpmessage() {
		  loadhelp();
	    	WebElement helpmessage = driver.findElement(By.xpath("/html/body/div/div/div/main/form/div[2]/textarea"));
	    	 boolean checking = helpmessage.isSelected();
	       	 Assert.assertTrue(checking);
	    }
	  @Test
	    void testhelpsubbutton() {
		  loadhelp();
		        WebElement helpsubButton = driver.findElement(By.xpath("/html/body/div/div/div/main/form/button"));
		        helpsubButton.click();
		        Assert.assertTrue(helpsubButton.isSelected());
	 }
	  @Test
	    void testHelpmailLink() {
		  loadhelp();
	        WebElement helpmailLink = driver.findElement(By.xpath("/html/body/div/div/div/main/section/p[1]/a"));
	        assertNotNull(helpmailLink.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testLivechatLink() {
		  loadhelp();
	        WebElement livechatLink = driver.findElement(By.xpath("/html/body/div/div/div/main/section/p[3]/a"));
	        assertNotNull(livechatLink.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testGobackLink() {
		  loadhelp();
	        WebElement gobackLink = driver.findElement(By.xpath("/html/body/div/div/div/button"));
	        assertNull(gobackLink.getAttribute("href"), "help link should not have an href attribute");
	    }
	  @Test
	    void testhelpFooter() {
		  loadhelp();
	        WebElement helpsignup = driver.findElement(By.xpath("/html/body/div/div/div/footer/div"));
	        	 Assert.assertTrue("Footer is not displayed", helpsignup.isDisplayed());
	             String expectedFooterText = "www.La Connecxioncallchat.com";
	             String actualFooterText = helpsignup.getText();
	             Assert.assertEquals("Footer text does not match", expectedFooterText, actualFooterText);
	    }
	    @Test
	    void testhelpFooterpolicylink() {
	    	 loadhelp();
	        WebElement helpfooterlink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]"));
	        Assert.assertTrue("Terms link is not displayed", helpfooterlink.isDisplayed());
	    }
	    @Test
	    void testhelpFootersociallink() {
	    	 loadhelp();
	        WebElement helpfootersociallink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]"));
	        Assert.assertFalse("Terms link is not displayed", helpfootersociallink.isDisplayed());
	    }
	    
	  @Test
	    void testpolicyLink() {
		  loadHomePage();
	        WebElement policyLink = driver.findElement(By.xpath("/html/body/div/div/div/div/ul/li[2]/a"));
	        assertNotNull(policyLink.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testpolicymailLink() {
		  loadpolicy();
	        WebElement policymailLink = driver.findElement(By.xpath("/html/body/div/div/div/p[8]/section/p[1]/a"));
	        assertNotNull(policymailLink.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testLivechatLinkpolicy() {
		  loadpolicy();
	        WebElement livechatLinkpolicy = driver.findElement(By.xpath("/html/body/div/div/div/p[8]/section/p[3]/a"));
	        assertNotNull(livechatLinkpolicy.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testpolicyfooter() {
		  loadpolicy();
	        WebElement policyfooter = driver.findElement(By.xpath("/html/body/div/div/div/p[8]/footer"));
	        assertNotNull(policyfooter.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	    void testAboutLink() {
		  loadHomePage();
		  WebElement AboutLink = driver.findElement(By.xpath("/html/body/div/div/div/div/ul/li[3]/a"));
	        assertNotNull(AboutLink.getAttribute("href"), "help link should have an href attribute");
	    }
	  @Test
	  void testparaabout() {
		  loadAbout();
		  WebElement Aboutpara = driver.findElement(By.xpath("/html/body/div/div/div/p"));
	        assertNotNull(Aboutpara.getAttribute("href"), "help link should have an href attribute");
	  }
	  @Test
	    void testGobackaboutLink() {
		  loadhelp();
	        WebElement gobackaboutLink = driver.findElement(By.xpath("/html/body/div/div/div/button"));
	        assertNull(gobackaboutLink.getAttribute("href"), "help link should not have an href attribute");
	    }
}


	





