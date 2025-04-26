package edu.icet.ha.service.impl;

import edu.icet.ha.dto.User;
import edu.icet.ha.entity.UserEntity;
import edu.icet.ha.repository.UserRepository;
import edu.icet.ha.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final ModelMapper mapper;

    @Override
    public User createUser(User dto, String rawPassword) {
        UserEntity user = mapper.map(dto, UserEntity.class);
        user.setPassword(rawPassword);
        UserEntity saved = repository.save(user);
        return mapper.map(saved, User.class);
    }

    @Override
    public Optional<User> getUser(Integer id) {
        return repository.findById(id)
                .map(userEntity -> mapper.map(userEntity, User.class));
    }

    @Override
    public Optional<User> authenticate(String email, String password) {
        return repository.findByEmailAndPassword(email, password)
                .map(entity -> mapper.map(entity, User.class));
    }
}
