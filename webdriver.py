#!/usr/bin/env python
import pdb
import parser
import urllib
from splinter import Browser

def main():
    
    urlBase = "http://www.play.pokemonshowdown.com/battle-randombattle-"
    battleNumber = raw_input("Enter the number of the battle:")
    url = urlBase + battleNumber
    
    browser = Browser('chrome')
    browser.visit(url)
    battleLogInner = browser.find_by_css("div.battle-log")
    battleLog = battleLogInner.first.find_by_css("div.inner")
    print "made it"
    pdb.set_trace()
    print battleLog.value
        
    # print url
    # html = urllib.urlopen(url).read()
    # print html
        
    # print '\n'.join(parser.tokenizeHTML(open("test-battle.html")))  

if __name__ == "__main__":
    main()
