-- Jamia Islamabad EMS Database Schema (PostgreSQL)
-- Enterprise-grade, normalized, and optimized for scalability

-- -------------------------------------------------------------
-- 1. ROLE-BASED ACCESS CONTROL (RBAC) & USERS
-- -------------------------------------------------------------

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- -------------------------------------------------------------
-- 2. ACADEMIC STRUCTURE
-- -------------------------------------------------------------

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    head_of_department_id INT, -- Will reference teachers(id) after teachers table is created
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    department_id INT REFERENCES departments(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    duration_months INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    program_id INT REFERENCES programs(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    credits INT NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 3. FACULTY & STAFF
-- -------------------------------------------------------------

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    department_id INT REFERENCES departments(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    qualification TEXT NOT NULL,
    designation VARCHAR(100) NOT NULL, -- e.g., Mufti, Sheikh-ul-Hadith, Lecturer
    joining_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Circular reference resolve: Add foreign key for head of department
ALTER TABLE departments ADD CONSTRAINT fk_hod FOREIGN KEY (head_of_department_id) REFERENCES teachers(id) ON DELETE SET NULL;

-- -------------------------------------------------------------
-- 4. STUDENTS & PARENTS/GUARDIANS
-- -------------------------------------------------------------

CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    cnic VARCHAR(20) UNIQUE NOT NULL, -- Masked/validated 13-digit format
    phone VARCHAR(50) NOT NULL,
    occupation VARCHAR(150),
    address_permanent TEXT NOT NULL,
    address_temporary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    parent_id INT REFERENCES parents(id) ON DELETE RESTRICT,
    roll_no VARCHAR(50) UNIQUE, -- Generated upon admission approval
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    cnic_bform VARCHAR(20) UNIQUE NOT NULL, -- Student CNIC / B-Form
    phone VARCHAR(50),
    mobile VARCHAR(50) NOT NULL,
    address_permanent TEXT NOT NULL,
    address_temporary TEXT,
    current_status VARCHAR(50) DEFAULT 'enrolled', -- enrolled, graduated, suspended, left
    admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 5. ADMISSIONS MANAGEMENT
-- -------------------------------------------------------------

CREATE TABLE admissions (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    program_id INT REFERENCES programs(id) ON DELETE RESTRICT,
    form_no VARCHAR(100) UNIQUE NOT NULL,
    admission_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, draft
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 6. ATTENDANCE & ACADEMICS
-- -------------------------------------------------------------

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, -- present, absent, leave, late
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_course_date UNIQUE (student_id, course_id, date)
);

CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    exam_type VARCHAR(50) NOT NULL, -- Midterm, Final, Monthly, HifzTest
    marks_obtained DECIMAL(5,2) NOT NULL,
    marks_total DECIMAL(5,2) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 7. FINANCIAL MANAGEMENT
-- -------------------------------------------------------------

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_type VARCHAR(100) NOT NULL, -- Admission Fee, Monthly Fee, Exam Fee
    receipt_no VARCHAR(100) UNIQUE NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- Cash, Bank Transfer, EasyPaisa
    status VARCHAR(50) NOT NULL DEFAULT 'completed', -- pending, completed, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 8. COMMUNICATIONS & DOCUMENTS
-- -------------------------------------------------------------

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_audience VARCHAR(50) NOT NULL, -- all, students, teachers, parents
    published_by INT REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    associated_type VARCHAR(100) NOT NULL, -- Student, Teacher, Admission
    associated_id INT NOT NULL, -- references student_id, teacher_id, or admission_id
    document_type VARCHAR(100) NOT NULL, -- ProfilePhoto, CNICCopy, EducationalCert, Signature
    file_path TEXT NOT NULL, -- URL or path to file
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 9. AUDIT & LOGGING
-- -------------------------------------------------------------

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL, -- e.g., UPDATE_STUDENT, APPROVE_ADMISSION
    table_name VARCHAR(100) NOT NULL,
    row_id INT NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 10. INDEXES FOR PERFORMANCE OPTIMIZATION
-- -------------------------------------------------------------

CREATE INDEX idx_students_cnic ON students(cnic_bform);
CREATE INDEX idx_students_parent ON students(parent_id);
CREATE INDEX idx_parents_cnic ON parents(cnic);
CREATE INDEX idx_admissions_student ON admissions(student_id);
CREATE INDEX idx_admissions_status ON admissions(status);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_results_student ON results(student_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_documents_association ON documents(associated_type, associated_id);
