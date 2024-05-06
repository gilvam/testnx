# Testnx

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Start the application

Run `npx nx serve testnx` to start the development server. Happy coding!

## Build for production

Run `npx nx build testnx` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)

```javascript

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SegmentControlSelectedDirective } from './segment-control-selected.directive';

@Component({
	template: `
	<div [value]="'week'" appSegmentControlSelected>
		<button value="week"></button>
		<button value="month" class="checked"></button>
	</div>
	`,
})
class TestComponent {
	isChecked = false;
}

describe('SegmentControlSelectedDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let directive: SegmentControlSelectedDirective;
	let weekButton: DebugElement;
	let monthButton: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, SegmentControlSelectedDirective],
			providers: [
				SegmentControlSelectedDirective,
				Renderer2,
				{ provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
			]
		});

		fixture = TestBed.createComponent(TestComponent);
		directive = TestBed.inject(SegmentControlSelectedDirective);
		weekButton = fixture.debugElement.query(By.css('button[value="week"]'));
		monthButton = fixture.debugElement.query(By.css('button[value="month"]'));
		fixture.detectChanges();
	});

	it('should add "checked" class to the last button with value="month" after a short delay', (done) => {
		directive.childrenName = 'button';
		fixture.detectChanges();


		// Initial setup
		expect(weekButton.nativeElement.classList.contains('checked')).toBeFalsy();
		expect(monthButton.nativeElement.classList.contains('checked')).toBeTruthy();

		const segmentElement = fixture.debugElement.query(By.directive(SegmentControlSelectedDirective));
		const segmentDirective = segmentElement.injector.get(SegmentControlSelectedDirective);
		// segmentDirective.value = 'week';
		segmentDirective.childrenName = 'button';
		console.log(`segmentDirective.value: `, segmentDirective.value);

		// console.log(`segmentDirective.value: `, segmentDirective.value);
		// segmentDirective.ngAfterViewInit();
		// fixture.detectChanges();

		// Wait for a short delay
		// tick(100);,

		directive.ngAfterViewInit();
		fixture.detectChanges();

		// monthButton need to be checked
		expect(weekButton.nativeElement.classList.contains('checked')).toBeTruthy();
		done();
	});
});







describe('SegmentControlSelectedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: SegmentControlSelectedDirective;
  let weekButton: DebugElement;
  let monthButton: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SegmentControlSelectedDirective],
      providers: [
        Renderer2,
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    directive = fixture.debugElement.query(By.directive(SegmentControlSelectedDirective)).injector.get(SegmentControlSelectedDirective);
    directive.childrenName = 'button';

    spyOn(directive, 'start').and.callThrough();
    spyOn(directive, 'stop').and.callThrough();

    weekButton = fixture.debugElement.query(By.css('button[value="week"]'));
    monthButton = fixture.debugElement.query(By.css('button[value="month"]'));
  });

  it('should call start() function when initialized', () => {
    expect(directive.start).toHaveBeenCalled();
  });

  it('should call stop() function when destroyed', () => {
    fixture.destroy();
    expect(directive.stop).toHaveBeenCalled();
  });

  it('should remove "checked" class from other button when parent value changes', fakeAsync(() => {
    // Initial setup
    expect(weekButton.nativeElement.classList.contains('checked')).toBeTruthy();
    expect(monthButton.nativeElement.classList.contains('checked')).toBeFalsy();

    // Simulate change in parent value
    fixture.componentInstance.parentValue = 'month';
    fixture.detectChanges();

    // Wait for changes to be processed
    tick(200);

    // Assertion after change
    expect(weekButton.nativeElement.classList.contains('checked')).toBeFalsy();
    expect(monthButton.nativeElement.classList.contains('checked')).toBeTruthy();
  }));
});





@Component({
  template: `
    <div appSegmentControlSelected>
      <button value="week"></button>
      <button value="month"></button>
    </div>
  `
})
class TestComponent {}

describe('SegmentControlSelectedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: SegmentControlSelectedDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SegmentControlSelectedDirective],
      providers: [
        Renderer2,
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    directive = TestBed.inject(SegmentControlSelectedDirective);
    directive.childrenName = 'button';
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the childrenName property correctly', () => {
    expect(directive.childrenName).toBe('button');
  });
});

``

