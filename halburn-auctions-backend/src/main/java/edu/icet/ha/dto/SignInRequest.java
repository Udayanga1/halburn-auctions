package edu.icet.ha.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    private String email;
    private String password;
}
