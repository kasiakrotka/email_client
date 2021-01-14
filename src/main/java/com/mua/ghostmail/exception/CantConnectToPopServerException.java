package com.mua.ghostmail.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class CantConnectToPopServerException extends RuntimeException{
        public CantConnectToPopServerException() {
            super("Brak połączenia z serwerem POP3");
        }
}
