package com.ren.selfbusiness.resolver.exception;

public interface ExceptionResolver {
    RuntimeException resolve(String errorCode);
}
