# CORS Configuration Guide

## Frontend Solution (Already Configured ✅)

The frontend is now configured to use a proxy in development mode. The React dev server will automatically proxy API requests to `http://localhost:8080`.

### What was changed:
1. Added `"proxy": "http://localhost:8080"` to `package.json`
2. Updated `api.js` to use relative URLs (`/api/notifications`) in development

### To apply the changes:
1. **Restart your React development server** (stop and run `npm start` again)
2. The proxy will automatically forward requests from `http://localhost:3001/api/notifications/*` to `http://localhost:8080/api/notifications/*`

---

## Backend Solution (Recommended for Production)

For production or if you prefer to handle CORS on the backend, configure your Java backend to allow CORS requests.

### Spring Boot CORS Configuration

Add one of these configurations to your backend:

#### Option 1: Global CORS Configuration (Recommended)

Create a `CorsConfig.java` file:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow all origins (for development)
        // In production, specify exact origins: config.setAllowedOrigins(Arrays.asList("https://yourdomain.com"));
        config.setAllowedOrigins(Arrays.asList("http://localhost:3001", "http://localhost:3000"));
        
        // Allow all HTTP methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        // Allow all headers
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // Allow credentials
        config.setAllowCredentials(true);
        
        // Cache preflight response for 1 hour
        config.setMaxAge(3600L);
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

#### Option 2: Controller-Level CORS

Add `@CrossOrigin` annotation to your controller:

```java
@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class NotificationController {
    // Your controller code
}
```

#### Option 3: Method-Level CORS

Add `@CrossOrigin` to specific endpoints:

```java
@CrossOrigin(origins = "http://localhost:3001")
@GetMapping("/history")
public ResponseEntity<List<Notification>> getHistory() {
    // Your code
}
```

#### Option 4: WebMvcConfigurer (Alternative)

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3001", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

## Testing the Connection

1. **Frontend**: Restart your React dev server (`npm start`)
2. **Backend**: Ensure your backend is running on `http://localhost:8080`
3. **Test**: Open `http://localhost:3001` and check the browser console

The proxy should now handle CORS automatically in development!

---

## Production Considerations

For production:
1. Update the `API_BASE_URL` in `api.js` to your production backend URL
2. Configure CORS on your backend to only allow your production frontend domain
3. Remove or update the proxy configuration in `package.json` if needed


