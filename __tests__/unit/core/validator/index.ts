import { Validator } from '../../../../src/core'

import componentUidlSample from '../../../fixtures/component-sample.json'
import invalidComponentUidlSample from '../../../fixtures/component-invalid-sample.json'
import multiErrorsInvalidComponentUidlSample from '../../../fixtures/component-invalid-sample-multiple-errors.json'

import projectUidlSample from '../../../fixtures/project-sample.json'
import invalidProjectUidlSample from '../../../fixtures/project-invalid-sample.json'

describe('Validate UIDL', () => {
  describe('Component UIDL', () => {
    it('returns object with valid=true and errorMsg="" if uidl is valid', () => {
      const validator = new Validator()
      const validationResult = validator.validateComponent(componentUidlSample)

      expect(typeof validationResult).toBe('object')
      expect(validationResult.valid).toEqual(true)
      expect(validationResult.errorMsg).toEqual('')
    })
    it('returns customized error', () => {
      const validator = new Validator()
      const validationResult = validator.validateComponent(invalidComponentUidlSample)
      expect(typeof validationResult).toBe('object')
      expect(validationResult.valid).toEqual(false)
      expect(validationResult.errorMsg).toBe(
        'UIDL Validation error. Please check the following: \n - Path .content: should NOT have additional properties. {"additionalProperty":"key"}'
      )
    })
    it('returns multiple customized errors', () => {
      const validator = new Validator()
      const validationResult = validator.validateComponent(multiErrorsInvalidComponentUidlSample)
      const expectedErrorMsg = `UIDL Validation error. Please check the following: 
 - Path .content: should NOT have additional properties. {"additionalProperty":"types"},
 - Path .content: should NOT have additional properties. {"additionalProperty":"key"},
 - Path .content: should have required property \'type\'. {"missingProperty":"type"},
 - Path .stateDefinitions[\'activeTab\'].type: should be string. Received number,
 - Path .stateDefinitions[\'activeTab\'].type: should be equal to one of the allowed values. {"allowedValues":["string","boolean","number","object","func","array","router"]},
 - Path .propDefinitions[\'test\'].type: should be equal to one of the allowed values. {"allowedValues":["string","boolean","number","array","func","object","children"]}`
      expect(typeof validationResult).toBe('object')
      expect(validationResult.valid).toEqual(false)
      expect(validationResult.errorMsg).toBe(expectedErrorMsg)
    })
  })

  describe('Project UIDL', () => {
    it('returns object with valid=true and errorMsg="" if uidl is valid', () => {
      const validator = new Validator()
      const validationResult = validator.validateProject(projectUidlSample)

      expect(typeof validationResult).toBe('object')
      expect(validationResult.valid).toEqual(true)
      expect(validationResult.errorMsg).toEqual('')
    })
    it('returns customized error', () => {
      const validator = new Validator()
      const validationResult = validator.validateProject(invalidProjectUidlSample)
      expect(typeof validationResult).toBe('object')
      expect(validationResult.valid).toEqual(false)
      expect(validationResult.errorMsg).toBe(
        `UIDL Validation error. Please check the following: 
 - Path : should have required property 'name'. {"missingProperty":"name"},
 - Path .globals.settings: should NOT have additional properties. {"additionalProperty":"key"},
 - Path .globals.settings.language: should be string. Received number,
 - Path .globals.assets[1].type: should be equal to one of the allowed values. {"allowedValues":["link","script","font","icon","style"]}`
      )
    })
  })
})
