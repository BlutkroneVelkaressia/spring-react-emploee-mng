package com.example.eme.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "employee")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String role; // 예: MANAGER, STAFF

    // 연관관계 매핑 (N:1)
    @ManyToOne(fetch = FetchType.LAZY) // 실무 필수: 지연 로딩 사용
    @JoinColumn(name = "dept_id")
    private Department department;

    @Builder
    public Employee(String name, String email, String role, Department department) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.department = department;
    }
    
    // 비즈니스 로직: 정보 수정 (Setter 대신 명확한 메서드명 사용)
    public void updateInfo(String name, String role, Department department) {
        this.name = name;
        this.role = role;
        if (department != null) {
            this.department = department;
        }
    }
}