package base;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import utils.WinksReporter;

public class BaseTest {

    protected WebDriver driver;
    protected WinksReporter reporter = new WinksReporter();

    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.setBinary("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        reporter.send("Test Started", "START");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
        reporter.send("Test Finished", "END");
    }
}