import { autocomplete, autocompleteDetails } from '../../src/api/search';
import { expect } from 'chai';

describe('search', function() {

  describe('autocomplete', function() {
    it('should return a valid query', function() {
      expect(
        autocomplete.validator({
          query: 'Text',
          lat: '-48.15021',
          lng: 17.12543,
          includeDetails: false
        })
      ).to.deep.equal({
        query: 'Text',
        lat: -48.15021,
        lng: 17.12543,
        includeDetails: false
      });
    });
  });

  describe('autocompleteDetails', function() {
    it('should return a valid query', function() {
      expect(
        autocompleteDetails.validator({
          resultId: 'resultId'
        })
      ).to.deep.equal({
        resultId: 'resultId'
      });
    });
  });
});