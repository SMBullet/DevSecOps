package com.pfemanager.service_auth.enums;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RoleEnumTest {

    @Test
    void testRoleValues() {
        Role[] roles = Role.values();
        assertEquals(3, roles.length);
        assertEquals(Role.STUDENT, roles[0]);
        assertEquals(Role.TEACHER, roles[1]);
        assertEquals(Role.ADMIN, roles[2]);
    }

    @Test
    void testRoleValueOf() {
        Role role = Role.valueOf("ADMIN");
        assertEquals(Role.ADMIN, role);
    }
}
