describe('<Form /> utils', () => {
  describe('getFieldErrors', () => {
    it('should get errors from field', () => {
      expect(getFieldErrors({
        value: 'fool',
        validator: {
          myCustomValidationRule: () => false,
        },
      }))
      .toBeA('array')
      .toEqual(['myCustomValidationRule'])
    })
  })
})
