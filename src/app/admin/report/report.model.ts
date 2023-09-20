export class Report {
  _id: string;
  creator: {
    _id: string;
    profileImage: string;
    userName: string;
  };
  reportMessage: string;
  reportTo: string;
  reportDate: string;
}
