import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICardDetail } from '../../../../models/ICardDetail';

@Component({
  selector: 'app-number-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './number-card.component.html',
  styleUrl: './number-card.component.scss',
})
export class NumberCardComponent {
  @Input() details: ICardDetail = { title: '', total: 0 };
}
