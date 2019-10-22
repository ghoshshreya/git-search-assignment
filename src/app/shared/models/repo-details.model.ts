export class RepoDetailsModel {
  repoName: string;
  repoDesc: string;
  repoLink: string;
  size: string;
  language: string;

  constructor(repoName: string, repoDesc: string, repoLink: string, size: string, language: string)
  {
    this.repoName = repoName;
    this.repoDesc = repoDesc;
    this.repoLink = repoLink;
    this.size = size;
    this.language = language;
  }
}