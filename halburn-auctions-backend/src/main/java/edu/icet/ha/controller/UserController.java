package edu.icet.ha.controller;

import edu.icet.ha.dto.SignInRequest;
import edu.icet.ha.dto.User;
import edu.icet.ha.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody User user) {
        User created = service.createUser(user, user.getPassword());
        if (created != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User Created");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Create User");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return service.getUser(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/signin")
    public ResponseEntity<User> signIn(@RequestBody SignInRequest req) {
        System.out.println("req in controller: " + req);
//        return service.authenticate(req.getEmail(), req.getPassword())
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.status(401).build());
        Optional<User> user = service.authenticate(req.getEmail(), req.getPassword());
        System.out.println("user received to controller: " + user);
        return user
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
