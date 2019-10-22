import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../../shared/services/common-service.service';
import { RepoDetailsModel } from '../../../shared/models/repo-details.model';
import { Url } from '../../../url.enum.ts';

@Component({
  selector: 'github-user-profile',
  templateUrl: './github-user-profile.component.html',
  styleUrls: ['./github-user-profile.component.scss']
})
export class GithubUserProfileComponent implements OnInit, OnDestroy {

  private getUserDetailsSubscription: Subscription;
  public getRepoDetailsSubscription: Subscription;

  public error: string = null;

  public isProfileReady: boolean = false; 

  public currUserDetails: any = null;
  public repoArray: RepoDetailsModel[] = [];
  public displayRepoArray: RepoDetailsModel[] = [];
  public displayRepoThreshold: number = 5;
  public isRepodataReady: boolean = false;
  
  constructor(private route: ActivatedRoute, private _commonService: CommonService) { }

  ngOnInit() {
    //FETCHING THE ROUTE PARAMETER (USERNAME)
    this.route.params.subscribe(params => {
      if(undefined != params.userName)
      {
        this.getUserDetails(params.userName);
      }
    });
  }

  /*---------METHOD TO FETCH THE USER PROFILE DETAILS-----------*/
  getUserDetails(userName) {
    let url = Url.GITHUB_USER_DEATILS_URL+userName;
    this.getUserDetailsSubscription = this._commonService.get(url).subscribe((data)=>
    {
      try
      {      
        if(undefined != data && undefined != data.login)
        {
          this.currUserDetails = data;
          this.getRepoDetails(data.repos_url);
          // this.getRepoDetails('../../assets/mock-json/getRepos.json');
        } 
        else
        {
          this.error = "UNEXPECTED_ERROR";
        }
      }
      catch(e)
      {
        console.error("getUserDetails() :: Exception occurred :: ",e);
      }
      this.isProfileReady = true;
    },
    (error)=>
    {
      this.isProfileReady = true;
      this.error = "UNEXPECTED_ERROR";
      console.error("getUserDetails() :: Exception occurred white fetching API data:: ",error);
    });
  }

  /*----------METOD TO FETCH THE REPO DATA----------*/
  getRepoDetails(url)
  {
    this.isRepodataReady = false;
    this.repoArray.length = 0;
    this.getRepoDetailsSubscription = this._commonService.get(url).subscribe((data)=>{
      try
      {
        if(undefined != data)
        {
          for(let y=0; y<data.length; y++)
          {
            if(y <= 50) //RECIEVING ONLY 50 RECORDS FOR NOW SINCE API IS SLOW
            {
              if(!data[y].private)
              {
                let repoDetailsEntity = new RepoDetailsModel(data[y].name,data[y].description,data[y].html_url,data[y].size, data[y].language);
                this.repoArray.push(repoDetailsEntity);
                if(this.displayRepoArray.length < this.displayRepoThreshold)
                {
                  this.displayRepoArray.push(repoDetailsEntity);
                }
              }
            }
            else
            {
              break;
            }
          }
        }
      }
      catch(e)
      {
        console.error("getRepoDetails() :: Exception occurred :: ",e);
      }
      this.isRepodataReady = true;
    },
    (error)=>
    {
      this.isRepodataReady = true;
      console.error("getRepoDetails() :: Exception occurred while fetching API data:: ",error);
    });
  }

  /*----------METHOD TO HANDLE THE LOAD MORE FUNCTIONALITY----------*/
  loadMore()
  {
    if(this.repoArray.length>this.displayRepoArray.length)
    {
      let counter = 0;
      for(let x = this.displayRepoArray.length; x<this.repoArray.length; x++)
      {
        if(counter < this.displayRepoThreshold)
        {
          this.displayRepoArray.push(this.repoArray[x]);
        }
        counter++;
      }
    }
  }

  ngOnDestroy()
  {
    this.unsubscribeAll()
  }
  
  /*----------METHOD TO UNSUBSCRIBE TO ALL PENDING SUBSCRIPTIONS TO AVOID MEMORY LEAK----------*/
  unsubscribeAll()
  {
    if(this.getUserDetailsSubscription){this.getUserDetailsSubscription.unsubscribe()}
    if(this.getRepoDetailsSubscription){this.getRepoDetailsSubscription.unsubscribe()}
  }
}