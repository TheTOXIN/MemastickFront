import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public steps = [{
    number: 1,
    name: 'РОЖДЕНИЕ',
    description: 'Мем тольчко что был создан и уже готов покорять этот мир и ваши эмоции. В этотм состояние вы можете добавить мем в любимчики. Чтобы создать мем используйте токен инициализации',
    color: '#b8d255',
    idHeading: 'headingStep1',
    idCollapse: 'collapseStep1',
  }, {
    number: 2,
    name: 'СИНТЕЗИРОВАНИЕ',
    description: 'Наш мемасик уже совсем большой. В этом состоянии он входит в больший мир и ждет когда его оценят по достоинству. От этого которох зависит его шанс выжить. Для этого используйте фитнес токен.',
    color: '#FCD006',
    idHeading: 'headingStep2',
    idCollapse: 'collapseStep2',
  }, {
    number: 3,
    name: 'МУТИРОВАНИЕ',
    description: 'Пока мем находится в этом состояние, вы можете оставлять комментарии под ним, используя токен мутаген, за ваши мутации могут голосвать другие меметики. Тем самым увеличивая свой днк и хромосомы мема. ',
    color: '#D85566',
    idHeading: 'headingStep5',
    idCollapse: 'collapseStep5',
  }, {
    number: 4,
    name: 'РАЗМНОЖЕНИЕ',
    description: 'Кажется мемчик хочет любви, вы можите создать новый мем на основе дргуих в этом состоянии. Чтобы скрещивать мемы, используйте токен кроссовер. Если другим меметикам понравится ваше скрещивание у вас бдует новый мем.',
    color: '#75B2E4',
    idHeading: 'headingStep4',
    idCollapse: 'collapseStep4',
  }, {
    number: 5,
    name: 'ВЫЖИВАНИЕ',
    description: 'Это последний этап эфолюции. Мем находится на грани вымирания, шанс его выживания зависит от кол-во накопленных хромосом. С помощью токена силекшина вы можете увеличить этот шанс',
    color: '#B985D1',
    idHeading: 'headingStep3',
    idCollapse: 'collapseStep3',
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
