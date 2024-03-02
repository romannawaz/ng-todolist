import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thead',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thead.component.html',
  styleUrl: './thead.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TheadComponent {
  @Input()
  sortDirection?: boolean;
}
