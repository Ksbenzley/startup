import React from 'react';
import './createAccountStyle.css';

export function createAccount() {
  return (
    <main>
      <form className="signup-form">
            <div className="form-group">
                <label>Username:</label>
                <input type="text" /><br/><br/>
                <label>Password:</label>
                <input type="text" /><br/><br/>
                <label>Re-enter Password:</label>
                <input type="text" /><br/><br/>
            </div>
        </form>
        <div className="button-group">
            <button>Create Account</button>
            <label>DB placeholder here</label>
        </div>

        <br/><br/>
    </main>
  );
}