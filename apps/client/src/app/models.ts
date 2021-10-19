export interface IActivityData {
  id: string;
  message: string;
}

export interface IActivityOutcome {
  metaData: {
    invalid: boolean;
  };
  next: string;
}

export interface IInitPayload {
  arguments: {
    execute: {
      body: string;
      format: string;
      header: string;
      timeout: number;
      url: string;
      verb: string;
    };
  };
  configurationArguments: {
    applicationExtensionKey: string;
    publish: {
      url: string;
      verb: string;
    };
    save: {
      url: string;
      verb: string;
    };
    stop: {
      url: string;
      verb: string;
    };
    validate: {
      url: string;
      verb: string;
    };
  };
  editable: boolean;
  errors: any;
  id: any;
  key: string;
  metadata: {
    category: string;
    icon: string;
    iconSmall: string;
    original_iton: string;
    statsContactIcon: any;
  };
  name: string;
  outcomes: IActivityOutcome[];
}

export interface IEndPoints {
  fuelapiRestHost: string;
  restHost: string;
  ssoUrl: string;
  stackHost: string;
  stackKey: string;
}

export interface ITokens {
  expires: number;
  fuel2token: string;
  stackKey: string;
  token: string;
}
