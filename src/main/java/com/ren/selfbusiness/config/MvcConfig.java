package com.ren.selfbusiness.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final String FORWARD = "forward:/";

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{x:[\\p{L}\\d\\s\\-\\%]+}")
                .setViewName(FORWARD);
        registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\p{L}\\d\\s\\-\\%]+}")
                .setViewName(FORWARD);
    }
}