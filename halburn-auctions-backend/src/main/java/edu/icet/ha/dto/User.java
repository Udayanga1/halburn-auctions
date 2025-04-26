package edu.icet.ha.dto;

import edu.icet.ha.util.UserType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserType purpose;
}
