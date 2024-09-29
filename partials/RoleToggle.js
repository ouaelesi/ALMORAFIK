import React from 'react';
import PropTypes from 'prop-types';

const RoleToggle = ({ isStudent, toggleRole }) => {
  return (
    <div className="role-toggle-container">
      <div className="role-toggle">
        <div
          className={`role-option ${isStudent ? 'active' : ''}`}
          onClick={() => !isStudent && toggleRole()}
        >
          Student
        </div>
        <div
          className={`role-option ${!isStudent ? 'active' : ''}`}
          onClick={() => isStudent && toggleRole()}
        >
          Teacher
        </div>
      </div>
      <style jsx>{`
        .role-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .role-toggle {
          display: flex;
          border: 1px solid #ccc;
          border-radius: 25px;
          overflow: hidden;
        }
        .role-option {
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }
        .role-option.active {
          background-color: #007bff;
          color: white;
        }
        .role-option:not(.active) {
          background-color: white;
          color: #007bff;
        }
      `}</style>
    </div>
  );
};

RoleToggle.propTypes = {
  isStudent: PropTypes.bool.isRequired,
  toggleRole: PropTypes.func.isRequired,
};

export default RoleToggle;