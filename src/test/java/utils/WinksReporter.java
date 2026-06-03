package utils;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class WinksReporter {

    private static final String WINKS_URL = "http://localhost:3000/report";

    public void send(String message, String status) {
        try {
            URL url = new URL(WINKS_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setConnectTimeout(3000);
            conn.setReadTimeout(3000);
            conn.setDoOutput(true);

            String payload = "{"
                    + "\"message\":\"" + message + "\","
                    + "\"status\":\"" + status + "\","
                    + "\"timestamp\":\"" + System.currentTimeMillis() + "\""
                    + "}";

            OutputStream os = conn.getOutputStream();
            os.write(payload.getBytes());
            os.flush();
            os.close();

            int responseCode = conn.getResponseCode();
            System.out.println("[Winks] " + status + " - " + message + " (HTTP " + responseCode + ")");

        } catch (Exception e) {
            System.out.println("[Winks] Failed to send report: " + e.getMessage());
        }
    }
}