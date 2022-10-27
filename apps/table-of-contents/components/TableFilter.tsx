export default function TableFilter() {
  const chooseFromMediaType = (
    <>
      <select
        id="fromMediaType"
        class="text-blue-800 px-2 rounded-md appearance-none cursor-pointer"
      >
        <option value="audiobook">listening to the audiobook</option>
        <option value="ebook">reading the ebook</option>
        <option value="webnovel">reading the web novel</option>
      </select>
    </>
  );
  const chooseCollectionNumber = (
    <>
      <select
        id="collectionNumber"
        class="text-blue-800 px-2 rounded-md appearance-none cursor-pointer"
      >
        <option value="1">Book 1: The Wandering Inn</option>
        <option value="2">Book 2: Fae and Fare</option>
        <option value="3">Book 3: Flowers of Esthelm</option>
        <option value="4">Book 4: Winter Solstice</option>
        <option value="5">Book 5: The Last Light</option>
        <option value="6">Book 6: The General of Izril</option>
        <option value="7">Book 7: Rains of Liscor</option>
        <option value="8">Book 8: Blood of Liscor</option>
      </select>
    </>
  );
  const chooseChapterNumber = (
    <>
      <select
        id="chapterNumber"
        class="text-blue-800 px-2 rounded-md appearance-none cursor-pointer"
      >
        <option value="0">(completed)</option>
        <option value="1">Chapter 1</option>
        <option value="2">Chapter 2</option>
        <option value="3">Chapter 3</option>
      </select>
    </>
  );
  const chooseToMediaType = (
    <>
      <select
        id="toMediaType"
        class="text-blue-800 px-2 rounded-md appearance-none cursor-pointer"
      >
        <option value="ebook">reading on the ebook</option>
        <option value="webnovel">reading on the web</option>
      </select>
    </>
  );

  return (
    <>
      <div class="text-3xl pb-4">
        I just finished {chooseFromMediaType} {chooseCollectionNumber}{" "}
        {chooseChapterNumber}, and I want to continue {chooseToMediaType}.
      </div>
      <div>
      </div>
    </>
  );
}
