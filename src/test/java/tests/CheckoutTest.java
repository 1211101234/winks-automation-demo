package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class CheckoutTest extends BaseTest {

    @Test
    @Parameters("simulateFailure")
    public void testCheckoutFlow(@Optional("false") String simulateFailure) {

        reporter.send("Navigating to application", "INFO");
        driver.get("https://example.com");

        reporter.send("User login successful", "PASS");
        reporter.send("Product added to cart", "PASS");
        reporter.send("Proceeding to payment", "INFO");

        boolean paymentSuccess = !Boolean.parseBoolean(simulateFailure);

        if (!paymentSuccess) {
            reporter.send("Payment failed - card declined", "FAIL");
            Assert.fail("Payment step failed during checkout");
        }

        reporter.send("Order confirmed", "PASS");
    }

}