import { expect } from 'chai';
import sinon from 'sinon';
import { hasExistingPseudonymPrefix } from './studyHelper';
import { config } from '../config';

const sandbox = sinon.createSandbox();

describe('StudyHelper', function () {
  before(() => {
    sandbox.stub(config, 'backendApiUrl').value('http://localhost/');
  });
  after(() => {
    sandbox.restore();
  });

  it('should return true if prefix exists', function () {
    const result = hasExistingPseudonymPrefix('LOCAL');
    expect(result).to.be.true;
  });

  it('should return false if prefix does not exist', function () {
    const result = hasExistingPseudonymPrefix('nothing');
    expect(result).to.be.false;
  });

  it('should trim trailing dashes', function () {
    const result = hasExistingPseudonymPrefix('LOCAL-');
    expect(result).to.be.true;
  });
});