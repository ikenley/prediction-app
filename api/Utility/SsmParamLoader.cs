using System;
using System.Threading.Tasks;
using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;

namespace PredictionApi;

/** Service which fetches an SSM param and sets to environment variables.
 * Designed to be a cheap, secure way to load sensitive environment vars into Lambda functions.
 */
public class SsmParamLoader {
  protected AmazonSimpleSystemsManagementClient client;

  public SsmParamLoader(AmazonSimpleSystemsManagementClient client) {
    this.client = client;
  }

  /** Fetch SSM param and load to env vars */
  public async Task<string> LoadToEnv(string ssmParamName, string envVarName) {
    var paramValue = await this.GetSsmParam(ssmParamName);

    Environment.SetEnvironmentVariable(envVarName, paramValue);

    return paramValue;
  }

  private async Task<string> GetSsmParam(string ssmParamName) {
    var command = new GetParameterRequest{
      Name= ssmParamName,
      WithDecryption= true,
    };
    var response = await this.client.GetParameterAsync(command);

    if (response == null || response.Parameter == null || response.Parameter.Value == null) {
      throw new Exception("Invalid SSM Parameter");
    }

    return response.Parameter.Value;
  }


}
