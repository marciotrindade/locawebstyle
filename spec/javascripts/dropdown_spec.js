describe("Dropdown: ", function() {
  beforeEach(function() {
    loadFixtures('dropdown_fixture.html');
    locastyle.dropdown.init();
  });

  describe("Dropdown toggle", function() {
    describe('when click on a dropdown trigger', function() {
      it("should activate a disabled related dropdown module", function() {
        // Added as pending because the tests broke while I was testing other functionality
        $("#dropdown-test > a:first-child").trigger("click");
        expect($("#dropdown-test").hasClass("ls-active")).toEqual(true);
      });

      it("should disable an active related dropdown module", function() {
        // Added as pending because the tests broke while I was testing other functionality
        $("#dropdown-test-2 > a:first-child").trigger("click");
        expect($("#dropdown-test-2").hasClass("ls-active")).toEqual(false);
      });

      it("should prevent default event on dropdown module", function() {
        // Added as pending because the tests broke while I was testing other functionality
        var spyEvent = spyOnEvent('#dropdown-test > a:first-child', 'click');
        $("#dropdown-test > a:first-child").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      });

      it("should close any opened dropdown", function() {
        // Added as pending because the tests broke while I was testing other functionality
        $("#dropdown-test-4 #dropdown-default > a:first-child").trigger("click");
        expect($("#dropdown-test-4 #dropdown-active").hasClass("ls-active")).toEqual(false);
      });

    });

    describe("When click outside dropdown click", function() {
      it("should close opened dropdown", function() {
        $("#fake-body").trigger("click");
        expect($("#dropdown-test-3").hasClass("ls-active")).toEqual(false);
      });
    });

    describe("When dropdown is disabled", function() {
      it("should have nothing", function() {
        $("#dropdown-test-5 > .ls-disabled").trigger("click");
        expect($("#dropdown-test-5").hasClass("ls-active")).toEqual(false);
      });
    });

  });

  describe("Unbind:", function() {
    describe("when unbind is called in module init", function() {
      it("should prevent toggleDropdown from being called twice or more times", function() {
        // Added as pending because the tests broke while I was testing other functionality
        var spy = spyOn(locastyle.dropdown, "toggleDropdown");
        locastyle.dropdown.init();
        locastyle.dropdown.init();
        $("#dropdown-test > a:first-child").trigger("click");
        expect(locastyle.dropdown.toggleDropdown.calls.count()).toEqual(1);
      });

      it("should prevent closeDropdown from being called twice or more times", function() {
        var spy = spyOn(locastyle.dropdown, "closeDropdown");
        locastyle.dropdown.init();
        locastyle.dropdown.init();
        $("#fake-body").trigger("click");
        expect(locastyle.dropdown.closeDropdown.calls.count()).toEqual(1);
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $("#dropdown-test > a:first-child").on("click", function () {
          window.test.method();
        })
        locastyle.dropdown.unbind();
        $("#dropdown-test > a:first-child").trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });

});
