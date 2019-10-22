import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/services/common-service.service';
import { Url } from '../../../url.enum';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.scss']
})
export class GitSearchComponent {
  
  public initialSearchResultThreshold: number = 3;
  public searchedUserArray = [];  
  public searchedUserDisplayArray = [];
  public isReady: boolean = true;
  public noData: boolean = false;

  private searchSubscription: Subscription;

  constructor(private _commonService: CommonService, private router: Router) {}
 
  /*----------METHOD TO TRIGGER THE API AND FETCH SEARCH RESULTS----------*/
  triggerSearch(formValue)
  {
    this.isReady = false;
    this.noData = false;
    this.searchedUserArray.length = 0;
    this.searchedUserDisplayArray.length = 0;
    
    if(undefined != formValue.searchInput && '' != formValue.searchInput)
    {
      this.searchSubscription = this._commonService.get(Url.GITHUB_SEARCH_URL+formValue.searchInput).subscribe((data)=>
      {
        try
        {
          if(undefined != data && undefined != data.items)
          {          
            for(let searchResult of data.items)
            {
              this.searchedUserArray.push(searchResult);
              /*----------PREPARING INTIAL DATA FOR VIEW----------*/
              if(this.searchedUserDisplayArray.length < this.initialSearchResultThreshold)
              {
                this.searchedUserDisplayArray.push(searchResult)
              }
            }
          }
          else
          {            
            this.noData = true;
          } 
        }
        catch(e)
        {
          this.noData = true;
          console.error("triggerSearch() :: Exception occurred :: ",e);
        }
        this.isReady = true;
      },
      (error)=>
      {
        this.isReady = true;
        this.noData = true;
        console.error("triggerSearch() :: Exception occurred while fetching API Data :: ",error);
      })
    }
  }

  loadMore()
  {
    let counter = 0;
    for(let i = this.searchedUserDisplayArray.length; i < this.searchedUserArray.length; i++)
    {
      if(counter < this.initialSearchResultThreshold)
      {
        this.searchedUserDisplayArray.push(this.searchedUserArray[i]);
      }
      else
      {
        break;
      }
      counter++;
    }    
  }   
}