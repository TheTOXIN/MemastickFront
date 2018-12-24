import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public steps = [{
    number: 1,
    name: 'РОДИВШИЙСЯ',
    description: 'Новывй мем, только что созданный с помощью токена инициализации. Уже готов покорять этот мир и ваши эмоции',
    color: '#b8d255',
    idHeading: 'headingStep1',
    idCollapse: 'collapseStep1',
  }, {
    number: 2,
    name: 'РАЗВИВАЮЩИЙСЯ',
    description: 'Наш мемасик уже совсем большой. В этом состоянии он получает свои хромосомы, от которох зависит его шанс выжить. Для этого используйте фитнес токен.',
    color: '#FCD006',
    idHeading: 'headingStep2',
    idCollapse: 'collapseStep2',
  }, {
    number: 3,
    name: 'ВЫЖИВАЮЩИЙ',
    description: 'Мем находится на грани вымирания, шанс его выживания зависит от кол-во накопленных хромосом. С помощью токена силекшина вы можете увеличить этот шанс',
    color: '#B985D1',
    idHeading: 'headingStep3',
    idCollapse: 'collapseStep3',
  }, {
    number: 4,
    name: 'ОБОСТРЁННЫЙ',
    description: 'Кажется мемчик хочет любви, вы можите создать новый мем на основе двух дргуих в этом состоянии. Чтобы скрещивать мемы, используйте токен кроссовер. Если другим меметикам понравится ваше скрещивание у вас бдует новый мем.',
    color: '#75B2E4',
    idHeading: 'headingStep4',
    idCollapse: 'collapseStep4',
  }, {
    number: 5,
    name: 'МУТИРУЮЩИЙ',
    description: 'Пока мем находится в этом состояние, вы можете оставлять комментарии под ним, используя токен мутаген, за ваши мутации могут голосвать другие меметики. Тем самым увеличивая свой днк и хромосомы мема. ',
    color: '#D85566',
    idHeading: 'headingStep5',
    idCollapse: 'collapseStep5',
  }, {
    number: 6,
    name: 'ОСОБЬ',
    description: 'Поздравляю! Ваш мем стал полноценной особью. Это были не простые 5 испытаний. Но это ещё не все! Теперь ваш мем может сражаться с другими мемами. В случае победы вы получите мемкойны, а иначе...',
    color: '#000000',
    idHeading: 'headingStep6',
    idCollapse: 'collapseStep6',
  }, {
    number: 7,
    name: 'ТРУП',
    description: 'Да, такое случается... Возможно ваш мем проиграл в битве или умер на этапе отбора. Но ничего страшнего если у вас есть парочка мемкойнов :)',
    color: '#878684',
    idHeading: 'headingStep7',
    idCollapse: 'collapseStep7',
  }];

  constructor() {
  }

  ngOnInit() {
  }

}