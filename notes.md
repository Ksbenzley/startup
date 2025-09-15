# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Notes

- [Do Not Go Gentle Into That Goodnight](notes/doNotGoGentle.md)

This is me editing my notes.md file. From this lesson, I learned the basic of github and using repositories on my own device and others. Being able to use github fluently will make my experience of web design much easier.

## AWS

My IP address is: 18.213.18.69
When I first created the web site through Amazon AWS, it worked. But after creating a new domain name, it had a lot of issues. The problem was this: I had to create a new inbound rule that allowed port 443 to be accessed in addition to ports 80 and 22. I also needed two new 'A' Records: jammix.click and *.jammix.click. The first is just the main website while the second is for all subnets to be able to access the website. 

## Caddy

No problems, now it works just like it says in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).
I had to refresh caddy with the commands: 
- sudo systemctl reload caddy
- journalctl -u caddy --no-pager | tail -n 50
  
Before this, I also had to make sure that my domain name was active in the caddy file through this command: 
- vi Caddyfile

## HTML

Creating a link: 
- <a href="differentHTML.html">Visible Link</a>

<div>
- this creates a directory almost

<aside>
- creates an "aside" which basically is like a note or fun-fact

<nav>
- a directory where you can put other hyperlinks. Search engines look for this tag

You can also use "style="..." to make the text or whatever look slightly better by changing its size and/or color.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
