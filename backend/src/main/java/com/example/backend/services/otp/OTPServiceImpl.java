package com.example.backend.services.otp;


import com.example.backend.constants.AppConstant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Service
public class OTPServiceImpl implements IOTPService{


    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;


    public String generateOTP() {
        // Decode the Base64-encoded secret key
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);

        long currentTime = System.currentTimeMillis() / 1000; // Convert to seconds

        // Calculate the number of time steps that have passed
        long timeStep = currentTime / AppConstant.OTP_PERIOD;

        // Create a buffer to hold the time step value
        ByteBuffer buffer = ByteBuffer.allocate(8);
        buffer.putLong(0, timeStep);

        try {
            // Create an HMAC object with the specified algorithm and secret key
            Mac mac = Mac.getInstance(AppConstant.OTP_ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "RAW");
            mac.init(keySpec);

            // Generate the HMAC value
            byte[] hmacValue = mac.doFinal(buffer.array());

            // Calculate the offset for the dynamic truncation
            int offset = hmacValue[hmacValue.length - 1] & 0x0F;

            // Extract the 4 bytes at the offset
            int binary =
                    ((hmacValue[offset] & 0x7F) << 24) |
                            ((hmacValue[offset + 1] & 0xFF) << 16) |
                            ((hmacValue[offset + 2] & 0xFF) << 8) |
                            (hmacValue[offset + 3] & 0xFF);

            // Perform modulo operation to get the OTP
            int otpValue = binary % (int) Math.pow(10, AppConstant.OTP_DIGITS);

            // Format the OTP to have TOTP_DIGITS digits
            return String.format("%0" + AppConstant.OTP_DIGITS + "d", otpValue);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
            return null;
        }
    }

}
