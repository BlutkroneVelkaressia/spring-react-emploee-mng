package com.example.eme.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "department")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA용 기본 생성자 (외부 접근 제한)
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dept_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Builder
    public Department(String name) {
        this.name = name;
    }
}