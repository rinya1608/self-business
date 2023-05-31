package com.ren.selfbusiness.resolver.exception;

public interface ExceptionResolver {
    RuntimeException resolve(String errorCode);

    RuntimeException resolve(String errorCode, String message, Throwable e);

    RuntimeException resolve(String errorCode, String message);

    RuntimeException resolve(String errorCode, Throwable e);
}
