import { describe, it, expect, beforeEach } from 'vitest';
import { getUserId } from './userIdentifier';

describe('userIdentifier integration and unit tests', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should generate a new user id and store it in localStorage if not present', () => {
        const id = getUserId();
        expect(id).toBeDefined();
        expect(id).toContain('user_');
        expect(localStorage.getItem('user_id')).toBe(id);
    });

    it('should return the existing user id from localStorage if already present', () => {
        localStorage.setItem('user_id', 'existing_user_123');
        const id = getUserId();
        expect(id).toBe('existing_user_123');
    });
});
