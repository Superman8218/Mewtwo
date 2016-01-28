#!/usr/bin/env python
import pdb
from bs4 import BeautifulSoup


def main():
    print '\n'.join(tokenizeHTML(open("test-battle.html")))

# Takes either an open filehandle or string html and tokenizes it

def tokenizeHTML(html):
    soup = makeSoup(html)
    return tokenize(soup)
    
# Returns a tree with the html in it

def makeSoup(html):
    soup = BeautifulSoup(html, "html.parser")
    return soup

# Returns a list of strings, one for each event that happens over the course of the game
# Accepts as a parameter the soup containing the html to be tokenized

def tokenize(soup):
    tokens = []
    for tag in soup.find_all(tagFilter):
        line = ''
        for string in tag.stripped_strings:
            line += string.encode('utf-8') + ' '
        line = line.strip('!\n ')
        tokens.append(line)
    return tokens

# Filters the tags down to just the one that contain the information we want
# Takes as a argument a base tag, and then returns true if we want to include that tag

def tagFilter(tag):
    if (tag.name != 'div'):
        return False
    for child in tag.children:
        if (child.name == 'div'):
            return False
    return True

# Returns a string of all the moves that were used,
# in order and as a dictionary of who used the move and what move

def getAllMoves():
    return


    

if __name__ == "__main__":
    main()
