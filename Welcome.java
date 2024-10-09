
//By Navneet Kaur 2397947

package Pack1;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

class Welcome {
	
	  WebDriver driver;

	    @BeforeEach
	    public void setUp() {
	        driver = new ChromeDriver();
	        driver.get("http://localhost:3000/Welcome"); 
	    }

	    @AfterEach
	    public void tearDown() {
	        if (driver != null) {
	            driver.quit();
	        }
	    }
	    
	    
	    @Test
	    void Test_NavBar() {
	    driver.get("http://localhost:3000/Welcome"); 
        WebElement ChattingLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[1]/a"));
        String chatlinkText = ChattingLink.getText();
        assertTrue(chatlinkText.equals("Chatting"), "The navbar link should display 'Chatting'");
       
        WebElement GroupcallLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[2]/a"));
        String calllinkText = GroupcallLink.getText();
        assertTrue(calllinkText.equals("GroupCall"), "The navbar link should display 'GroupCall'");
	    
	    
	      WebElement Manage_profile = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[3]/a"));
        String ProfilelinkText = Manage_profile.getText();
        assertTrue(ProfilelinkText.equals("Manage Profile"), "The navbar link should display 'Manage Profile'");
	    
	    
	    WebElement Admin = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[4]/a"));
        String AdminlinkText = Admin.getText();
        assertTrue(AdminlinkText.equals("Admin"), "The navbar link should display 'Admin'");
	    
        WebElement Contact = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[5]/a"));
        String ContactlinkText = Contact.getText();
        assertTrue(ContactlinkText.equals("Contact"), "The navbar link should display 'Contact'");

	    }
	    
	    @Test
	    void NavBar_chatlink() {
	    driver.get("http://localhost:3000/Welcome"); 
	    WebElement chattingLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[1]/a"));
        String chatlinkText = chattingLink.getText();
        assertTrue(chatlinkText.equals("Chatting"), "The navbar link should display 'Chatting'");
        chattingLink.click(); 
        
        String chatPageUrl = driver.getCurrentUrl();
        assertTrue(chatPageUrl.contains("/Chat"), "The user should be redirected to the Chatting page");
        driver.navigate().back();
	
	    }
	    
	    @Test
	    void NavBar_GroupcallLink() {
	    driver.get("http://localhost:3000/Welcome"); 
	    WebElement GroupcallLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[2]/a"));
	    GroupcallLink.click();
	    String GroupChatUrl = driver.getCurrentUrl();
        assertTrue(GroupChatUrl.contains("/GroupCall"), "The user should be redirected to the GroupCall page");
        driver.navigate().back();
	
	    }
	    
	    @Test
	    void NavBar_Manage_ProfileLink() {
//	    driver.get("http://localhost:3000/Welcome"); 
	    WebElement ManageprofileLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[3]/a"));
	    ManageprofileLink.click();
	    String ProfileUrl = driver.getCurrentUrl();
        assertTrue(ProfileUrl.contains("/Manageprofile"), "The user should be redirected to the Manage Profile");
        driver.navigate().back();
	
	    }
	    
	    @Test
	    void NavBar_AdminLink() {
	    driver.get("http://localhost:3000/Welcome"); 
	    WebElement Admin = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[4]/a"));
	    Admin.click();
	    String ExpectedAdminLink = "http://localhost:3000/Admin";
	    String ActualAdminUrl = driver.getCurrentUrl();
        assertEquals(ExpectedAdminLink,ActualAdminUrl);
	    driver.navigate().back();
	
	    }
	    
	    @Test
	    void NavBar_ContactLink() {
	    driver.get("http://localhost:3000/Welcome"); 
	    WebElement Contact = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[5]/a"));
	    Contact.click();
	    String ExpectedContactLink = "http://localhost:3000/ContactUs";
	    String ActualContactUrl = driver.getCurrentUrl();
        assertEquals(ExpectedContactLink,ActualContactUrl);
	    driver.navigate().back();
	
	    }
	    
	    
	    @Test
	    void SignOutLink() {
	    driver.get("http://localhost:3000/Welcome"); 
	    WebElement Signout = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[6]/li/a"));
	    Signout.click();
	    String ExpectedContactLink = "http://localhost:3000/";
	    String ActualContactUrl = driver.getCurrentUrl();
        assertEquals(ExpectedContactLink,ActualContactUrl);
	    driver.navigate().back();
	
	    }
	    
	    @Test
	    public void testText() {

	        driver.get("http://localhost:3000/Welcome"); 
	        WebElement expectedText = driver.findElement(By.tagName("p"));
	        String actualtext = "Happy To See You Here. Let's join & Enjoy!";
	        assertNotSame(expectedText, actualtext, "The page text should match");
	    }
	    
	    @Test
	    public void tesEmailNotNull() {
	        	        driver.get("http://localhost:3000/Welcome"); 

	        WebElement errorMessage = driver.findElement(By.tagName("p"));
	        assertNotNull( errorMessage.getText());
	    }
	      
	    @Test
	    public void testEmailDisplayedCorrectly() {
	        driver.get("http://localhost:3000/Welcome"); 
	        WebElement emailElement = driver.findElement(By.className("home-container"));
	        String expectedEmail = "neet@gmail.com";  
	        String actualText = emailElement.getText();
	        assertEquals(actualText.contains("Welcome, " + expectedEmail + "!"),"the email should be same.");
	    }
	    
	    
	    
	    @Test
	    public void testClickChatButton() {
	        driver.get("http://localhost:3000/chat"); 
	    	 WebElement chatButton = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div/div/button[1]"));
	         chatButton.click();

	         String currentUrl = driver.getCurrentUrl();
	         assertTrue(currentUrl.contains("/chat"), "navigate to Chat page.");
	    }

	    
	    
	    @Test
	    public void testChattingButtonNotNull() {
	    	WebElement ChatButton = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[1]/a"));
	    	ChatButton.click();
		    assertNotNull(ChatButton);

	    }
	    
	    @Test
	    void testChattingButton() {
	        driver.get("http://localhost:3000/Welcome"); 
	        WebElement homeLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[1]/a"));
	        String expected = "http://localhost:3000/Chat";
	        String actual= extractHashLink(homeLink.getAttribute("href"));
	        assertEquals(expected,actual);
	    }
	    
	    @Test
	    public void testGroupCallButtonNotNull() {
	    	WebElement GroupCallButton = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[2]/a"));
	    	GroupCallButton.click();
		    assertNotNull(GroupCallButton);

	    }

	    @Test
	    void testClickGroupCallButton() {
	        driver.get("http://localhost:3000/Welcome"); 
	        WebElement homeLink = driver.findElement(By.xpath("/html/body/div/div/div/div[1]/ul/li[2]/a"));
	        String expected = "http://localhost:3000/GroupCall";
	        String actual= extractHashLink(homeLink.getAttribute("href"));
	        assertEquals(expected,actual);
	    }
	    
//	    test for footer part
	    
	    @Test
	    void ContactlinkVisibility() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[1]/p")); // replace YOUR_INDEX with the correct index
	    assertTrue(connexionCallChatLink.isDisplayed(), "The 'Connexion call chat' link should be visible");

	    }
	    
	    @Test
	    void Footer_ContactlinkClickable() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[1]/p")); 
	    connexionCallChatLink.click();
	    String ExpectedContactLink = "";
	    String ActualContactUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedContactLink,ActualContactUrl);

	    }
	    
	    @Test
	    void Footer_Email() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[1]/p")); 
	    connexionCallChatLink.click();
	    String ExpectedContactLink = "";
	    String ActualContactUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedContactLink,ActualContactUrl);

	    }
	    
	    
	    @Test
	    void Footer_ContactNumber() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[1]/p")); 
	    connexionCallChatLink.click();
	    String ExpectedContactLink = "";
	    String ActualContactUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedContactLink,ActualContactUrl);

	    }
	    
	    @Test
	    void Footer_GoogleLink() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]/p/a[1]")); 
	    connexionCallChatLink.click();
	    String ExpectedLink = "https://www.google.com/";
	    String ActualUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedLink,ActualUrl);

	    }
	    
	    @Test
	    void Footer_FacebookLink() {
	    WebElement FacebookLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]/p/a[2]")); 
	    FacebookLink.click();
	    String ExpectedLink = "https://www.facebook.com/";
	    String ActualUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedLink,ActualUrl);

	    }
	    
	    @Test
	    void Footer_InstagramLink() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[2]/p/a[3]")); 
	    connexionCallChatLink.click();
	    String ExpectedLink = "https://www.instagram.com/";
	    String ActualUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedLink,ActualUrl);

	    }
	    
	    @Test
	    void Footer_PrivacyLink() {
	    WebElement connexionCallChatLink = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]/p")); 
	    connexionCallChatLink.click();
	    String ExpectedLink = "";
	    String ActualUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedLink,ActualUrl);

	    }
	    
	    @Test
	    void Footer_TearmsConditionLink() {
	    WebElement TearmsCondition = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]/p")); 
	    TearmsCondition.click();
	    String ExpectedLink = "";
	    String ActualUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedLink,ActualUrl);

	    }
	    
	    @Test
	    void Footer_GuidelinesLink() {
	    WebElement Guidelines = driver.findElement(By.xpath("/html/body/div/div/div/footer/div/div[3]/p")); 
	    Guidelines.click();
	    String ExpectedLink = "";
	    String ActualUrl = driver.getCurrentUrl();
	    assertEquals(ExpectedLink,ActualUrl);

	    }
	    
	    
private String extractHashLink(String href) {
    return href.contains("#") ? href.substring(href.lastIndexOf("#")) : href;

}
	   
	}
