package com.pfemanager.service_auth.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.pfemanager.service_auth.enums.Role;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Data
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private UUID id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    @Transient
    private Integer age;

    @ElementCollection
    @Column(name ="projects", nullable = true)
    private List<UUID> projects = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }
    public User setDob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public User setRole(Role role){
        this.role = role;
        return this;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(()->"ROLE_" + role.name());
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    public Integer getAge(){
        return Period.between(this.dob,LocalDate.now()).getYears();
    }


}


