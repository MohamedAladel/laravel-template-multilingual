<?php

namespace App\Generator\Commands;

use App\Generator\ScaffoldFileGenerator;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\select;

class ScaffoldCommand extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scaffold {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate file for scaffold';

    /**
     * Configure the command.
     */
    protected function configure()
    {
        $this->setAliases(['sc', 'scaf', 'gen']);

        parent::configure();
    }

    /**
     * Prompt for missing input arguments using the returned questions.
     *
     * @return array<string, string>
     */
    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'model' => 'Name of model to generate scaffold e.g. User',
        ];
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $model = $this->argument('model');

        $type = select(
            label: 'Which type to generate ?',
            options: ['Scaffold Modal', 'Scaffold Page', 'Single Page'],
            default: 'Scaffold Modal',
        );
        $adminOnly = confirm('Only admin allowed ?');

        $scaffold = (new ScaffoldFileGenerator($model, $adminOnly));

        match ($type) {
            'Scaffold Modal' => $scaffold->ScaffoldModal(),
            'Scaffold Page' => $scaffold->ScaffoldPage(),
            'Single Page' => $scaffold->ScaffoldSinglePage(),
        };
    }
}