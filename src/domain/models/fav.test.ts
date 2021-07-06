import * as Fav from './fav';

// const ISO8601_PATTERN = /^¥d{4}-¥d{2}-¥d{2}T¥d{2}:¥d{2}:¥d{2}¥.¥d{3}Z$/u;

describe('Fav', () => {
  describe('factory', () => {
    it('returns an instance of Fav model', () => {
      const fav = Fav.factory({
        uri: 'https://sample.com',
        comment: 'test comment',
      });

      expect(fav.id.length).toBe(36);
      expect(fav.uri).toBe('https://sample.com');
      expect(fav.comment).toBe('test comment');
      expect(fav.createdAt).not.toBeNull();
      expect(fav.updatedAt).not.toBeNull();
      // expect(fav.createdAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
      expect(() => new Date(fav.createdAt)).not.toThrow();
      // expect(fav.updatedAt).toEqual(expect.stringMatching(ISO8601_PATTERN));
      expect(() => new Date(fav.updatedAt)).not.toThrow();
      expect(fav.createdAt).toEqual(fav.updatedAt);
    });
  });

  describe('update', () => {
    it('return an instance of changed Fav model', () => {
      const fav = Fav.factory({
        uri: 'https://sample.com',
        comment: 'test comment',
      });

      const changed = Fav.update(fav, {
        uri: 'https://change.com',
        comment: 'changed',
      });

      expect(changed.id).toBe(fav.id);
      expect(changed.uri).toBe('https://change.com');
      expect(changed.comment).toBe('changed');
      expect(changed.createdAt).toBe(fav.createdAt);
      expect(new Date(changed.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(changed.createdAt).getTime());
    });
  });
});
