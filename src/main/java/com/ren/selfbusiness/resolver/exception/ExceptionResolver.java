package com.ren.selfbusiness.resolver.exception;

public interface ExceptionResolver {
    RuntimeException resolve(String errorCode);
    RuntimeException resolve(String errorCode, Throwable e);
}
