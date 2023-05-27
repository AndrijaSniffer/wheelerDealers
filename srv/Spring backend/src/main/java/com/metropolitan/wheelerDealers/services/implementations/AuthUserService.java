package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.entities.AuthUser;
import com.metropolitan.wheelerDealers.repositories.IAuthUserRepo;
import com.metropolitan.wheelerDealers.security.services.UserDetailsImpl;
import com.metropolitan.wheelerDealers.services.IAuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthUserService implements IAuthUserService {
    @Autowired
    private IAuthUserRepo authUserRepo;

    @Override
    public List<AuthUser> getAllAuthUsers() {
        return authUserRepo.findAll();
    }

    @Override
    public boolean createOrUpdateAuthUser(AuthUser user) {
        return authUserRepo.save(user).getId() != null;
    }

    @Override
    public AuthUser getAuthUserById(Integer id) {
        return authUserRepo.findById(id).orElse(new AuthUser());
    }

    @Override
    public void deleteAuthUser(Integer id) {
        authUserRepo.deleteById(id);
    }

    @Override
    public UserDetails findByUsername(String username) {
        AuthUser user = authUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return authUserRepo.existsByUsername(username);
    }
}
