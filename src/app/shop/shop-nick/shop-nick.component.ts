import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {PriceConst} from '../../consts/PriceConst';
import {MemetickApiService} from '../../api/memetick-api-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidConst} from '../../consts/ValidConst';

@Component({
  selector: 'app-shop-nick',
  templateUrl: './shop-nick.component.html',
  styleUrls: ['./shop-nick.component.scss']
})
export class ShopNickComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

  public nickForm: FormGroup;
  public price = PriceConst.NICK;

  public disable = true;

  constructor(
    private memetickApi: MemetickApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.nickForm = this.fb.group({
      nick: ['', Validators.compose([
        Validators.required,
        Validators.minLength(ValidConst.MIN_LEN_NCK),
        Validators.maxLength(ValidConst.MAX_LEN_NCK)
      ])],
    });
  }

  update() {
    this.disable =
      this.nickForm.value.nick.length < ValidConst.MIN_LEN_NCK ||
      this.nickForm.value.nick.length > ValidConst.MAX_LEN_NCK;
  }

  buy() {
    this.memetickApi.changeNick(
      this.nickForm.value.nick,
      true
    ).subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }
}
