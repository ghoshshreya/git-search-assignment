import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  animations: [
    trigger('changeState', [
      state('initialState', style({
        width: '200px'
      })),
      state('focusedState', style({
        width: '220px',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      })),
      transition('*=>focusedState', animate('200ms ease-out')),
    ])
  ]
})
export class SearchBoxComponent
{
  public searchForm: FormGroup;
  public searchBoxFocused: boolean = false;
  public toState = 'initialState';

  @Input('isReady')
  public isReady: boolean = true;
    
  @Output()
  public triggerSearchEvent = new EventEmitter();

  constructor(private _fb: FormBuilder)
  {
    this.createForm();
  }

  changeState(state: any)
  {
    this.toState = state;
  }
  
  /*----------METHOD TO CREATE THE FORM AND FORM CONTROLS----------*/
  createForm()
  {
    this.searchForm = this._fb.group({
      'searchInput': [null, [Validators.required,Validators.maxLength(50)]]
    })
  }

  /*----------METHOD TO PASS THE USERNAME TO PARENT COMPONENT----------*/
  triggerSearch(formValue)
  {
    this.triggerSearchEvent.emit(formValue);
  }  
}