const TestDisc = artifacts.require('TestDisc');

module.exports = async function (deployer) {
  await deployer.deploy(TestDisc);
};