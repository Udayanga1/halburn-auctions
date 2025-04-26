package edu.icet.ha.service;

import edu.icet.ha.dto.User;

import java.util.Optional;

public interface UserService {
    User createUser(User dto, String rawPassword);
    Optional<User> getUser(Integer id);
    Optional<User> authenticate(String email, String password);
}
