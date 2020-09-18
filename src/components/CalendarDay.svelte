<div>
  <div class="h-102 overflow-y-scroll">
    {#each { length: 24 } as _, i}
      <div class="flex w-full h-20">
        <div class="h-full w-16">
          <p class="sticky top-0 p-1 text-gray-600">
            {i.toString().padStart(2, '0')}:00
          </p>
        </div>
        <div class="h-full flex-auto border-gray-400 border-b-2" />
      </div>
    {/each}
  </div>
</div>
