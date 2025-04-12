import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuggestionsService } from '../../../services/suggestions.service';

export type suggestionsType =
  | 'generalGeneration'
  | 'generalUpdate'
  | 'specificUpdate'
  | 'specificUpdateSingleMeal'
  | 'none';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.scss',
})
export class PromptInputComponent {
  private suggestionsService = inject(SuggestionsService);

  @Input() placeholder: string = 'Type something...';
  @Input() loading: boolean = false;
  @Input() suggestionsType?: suggestionsType = 'none';
  @Input() suggestionsContext?: string;
  @Output() promptSubmit = new EventEmitter<string>();

  suggestions = signal<string[]>([]);
  suggestionsLoading = signal<boolean>(false);

  prompt: string = '';

  ngOnInit() {
    if (this.suggestionsType === 'generalGeneration') {
      this.suggestionsLoading.set(true);
      this.suggestionsService.getGeneralGenerationSuggestions().then((suggestions) => {
        console.log('suggestions', suggestions);
        this.suggestions.set(suggestions);
        this.suggestionsLoading.set(false);
      });
    } else if (this.suggestionsType === 'generalUpdate') {
      this.suggestionsLoading.set(true);
      this.suggestionsService.getGeneralUpdateSuggestions(this.suggestionsContext ?? '').then((suggestions) => {
        this.suggestions.set(suggestions);
        this.suggestionsLoading.set(false);
      }); 
    } else if (this.suggestionsType === 'specificUpdate') {
      this.suggestionsLoading.set(true);
      this.suggestionsService.getSpecificUpdateSuggestions(this.suggestionsContext ?? '').then((suggestions) => {
        this.suggestions.set(suggestions);
        this.suggestionsLoading.set(false);
      });
    } else if (this.suggestionsType === 'specificUpdateSingleMeal') {
      this.suggestionsLoading.set(true);
      this.suggestionsService.getSpecificUpdateSuggestionsSingleMeal(this.suggestionsContext ?? '').then((suggestions) => {
        this.suggestions.set(suggestions);
        this.suggestionsLoading.set(false);
      });
    }
  }


  onSubmit() {
    if (this.prompt.trim() && !this.loading) {
      this.promptSubmit.emit(this.prompt);
    }
  }
}
